import { User } from "../../app/auth";

import { RegisterForm } from "../../components/Forms/User";
import Logo from "../../components/Logo";

import { HeroContent, HeroLayout } from "../common";
import useRegister from "./useRegister";

function Register() {
  const { register, form } = useRegister();
  return (
    <HeroLayout>
      <HeroContent>
        <Logo />
        <RegisterForm
          form={form}
          onRegister={async () => {
            register();
          }}
        />
      </HeroContent>
    </HeroLayout>
  );
}

export default Register;
