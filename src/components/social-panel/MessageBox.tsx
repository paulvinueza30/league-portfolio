// components/social/MessageBox.tsx
import { Textarea } from "../ui/textarea";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { messageButton } from "@/assets";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function MessagePopOver() {
  return (
    <Popover>
      <PopoverTrigger className="joy-message-button">
        <img
          src={messageButton}
          alt="message icon"
          draggable={false}
          className="w-14 h-12"
        />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="
              select-none 
              rounded-none
              bg-[#010A13] 
              border-2 border-[#463714] 
              text-[#F0E6D2] 
              backdrop-blur-sm
              p-4
            "
      >
        <MessageBox />
      </PopoverContent>
    </Popover>
  );
}

function MessageBox() {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          to_name: "Paul Vinueza",
          from_email: data.email,
          to_email: "paulvinueza30@gmail.com",
          message: data.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        console.log("✅ Email sent!");
      })
      .catch((error) => {
        console.error("❌ Failed to send email:", error);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#CDBE91] font-medium text-sm">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className="
                  rounded-none 
                  bg-[#0A1428] 
                  border-2 border-[#463714] 
                  text-[#F0E6D2] 
                  placeholder:text-[#5C5B57]
                  focus:border-[#C89B3C] 
                  focus:ring-0 
                  focus:ring-offset-0
                  transition-colors duration-300
                  shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                "
                  placeholder="Regular or IGN will do!"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#C8AA6E]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#CDBE91] font-medium text-sm">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="
                  rounded-none 
                  bg-[#0A1428] 
                  border-2 border-[#463714] 
                  text-[#F0E6D2] 
                  placeholder:text-[#5C5B57]
                  focus:border-[#C89B3C] 
                  focus:ring-0 
                  focus:ring-offset-0
                  transition-colors duration-300
                  shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                "
                  placeholder="What's your web address?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#C8AA6E]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#CDBE91] font-medium text-sm">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  className="
                  rounded-none 
                  bg-[#0A1428] 
                  border-2 border-[#463714] 
                  text-[#F0E6D2] 
                  placeholder:text-[#5C5B57]
                  focus:border-[#C89B3C] 
                  focus:ring-0 
                  focus:ring-offset-0
                  transition-colors duration-300
                  shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                  min-h-24
                  resize-none
                "
                  placeholder="What would you like to say?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#C8AA6E]" />
            </FormItem>
          )}
        />

        <Button
          className="
          w-full 
          rounded-none 
          bg-[#0A1428] 
          border-2 border-[#463714] 
          text-[#CDBE91] 
          hover:border-[#C89B3C] 
          hover:bg-[#1E272C] 
          hover:text-[#F0E6D2]
          transition-all duration-300
          shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
          hover:shadow-[0_0_10px_rgba(200,155,60,0.3)]
          font-medium
          py-3
        "
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
