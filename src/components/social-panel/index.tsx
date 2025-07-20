import { progressButton, messageButton } from "@/assets";

import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema } from "./emailSchema";

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

interface Panel {
  name: string;
  img: string;
  component: React.FC;
}

const socialPanel: Panel[] = [
  {
    name: "message icon",
    img: messageButton,
    component: MessageBox,
  },
  {
    name: "progress icon",
    img: progressButton,
    component: ProgressBox,
  },
];

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="Regular or IGN will do!"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="What's your web address?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="What would you like to say?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function ProgressBox() {
  return <h1>Progress</h1>;
}

export default function SocialPanel() {
  return (
    <div className="select-none flex">
      {socialPanel.map((e: Panel) => {
        const PanelComponent = e.component;
        return (
          <Popover key={e.name}>
            <PopoverTrigger>
              <img
                src={e.img}
                alt={e.name}
                draggable={false}
                className="w-12 h-12"
              />
            </PopoverTrigger>
            <PopoverContent side="top" className="select-none rounded-none">
              <PanelComponent />
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
