import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForms from "./components/sign-in-forms";
import SignUpForms from "./components/sign-up-forms";

const AuthenticationPage = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-5">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Novo Usuario</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForms />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForms />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
