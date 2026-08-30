"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const Row = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="payment-transfer_form-item">
    <div className="payment-transfer_form-content">
      <FormLabel className="text-[13.5px] font-medium text-foreground">
        {label}
      </FormLabel>
      {description && (
        <FormDescription className="text-[12px] text-muted-foreground">
          {description}
        </FormDescription>
      )}
    </div>
    <div className="flex w-full flex-col gap-1.5">
      {children}
      <FormMessage className="text-[12px] text-destructive" />
    </div>
  </div>
);

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      const transfer = await createTransfer(transferParams);

      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="surface flex max-w-[760px] flex-col px-5 sm:px-6"
      >
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem>
              <Row
                label="Source account"
                description="The Finway account funds will be sent from."
              >
                <FormControl>
                  <BankDropdown
                    accounts={accounts}
                    setValue={form.setValue}
                    otherStyles="w-full"
                  />
                </FormControl>
              </Row>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Row
                label="Transfer note"
                description="Optional context for the recipient and your records."
              >
                <FormControl>
                  <Textarea
                    placeholder="Write a short note here"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
              </Row>
            </FormItem>
          )}
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-[15px] font-semibold text-foreground">
            Recipient details
          </h2>
          <p className="text-[13px] text-muted-foreground">
            Enter the recipient&apos;s bank account details.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Row label="Recipient's email address">
                <FormControl>
                  <Input placeholder="ex: johndoe@gmail.com" {...field} />
                </FormControl>
              </Row>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharableId"
          render={({ field }) => (
            <FormItem>
              <Row label="Recipient's Plaid sharable ID">
                <FormControl>
                  <Input
                    placeholder="Enter the public account number"
                    {...field}
                  />
                </FormControl>
              </Row>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <Row label="Amount">
                <FormControl>
                  <Input placeholder="ex: 500.00" {...field} />
                </FormControl>
              </Row>
            </FormItem>
          )}
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" disabled={isLoading} className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              "Send money"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
