import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormProps = {
  action: (formData: FormData) => Promise<void>;
};

export function Form({ action }: FormProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enter username</CardTitle>
          <CardDescription>
            Enter your username below to join the game.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Let me in!
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
