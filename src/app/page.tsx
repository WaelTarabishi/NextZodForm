import Image from "next/image";
import FormWithReactHookFormAndZodAndServer from "./components/FormWithReactHookFormAndZodAndServer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormWithReactHookFormAndZodAndServer />
    </main>
  );
}
