import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForms from "./components/sign-in-forms";
import SignUpForms from "./components/sign-up-forms";
import { Header } from "@/components/common/header";

const AuthenticationPage = () => {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Novo Usuario</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForms />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForms />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AuthenticationPage;
