import { MembershipInformation } from "@components/MembershipInformation";
import { PaymentInformation } from "@components/PaymentInformation";
import { PurchaseInformation } from "@components/PurchaseInformation";
import { UserInformation } from "@components/UserInformation";

export default async function AdminSection({ params }) {
  const { admin } = await params; // Captura el nombre de la ruta dinámica
  console.log(admin);
  if (admin === "userInformation") {
    return (
      <div className="w-8/10 m-auto rounded-2xl bg-blur">
        <UserInformation />
      </div>
    );
  } else if (admin === "paymentInformation") {
    return (
      <div className="w-8/10 m-auto rounded-2xl bg-blur">
        <PaymentInformation />
      </div>
    );
  } else if (admin === "purchaseHistory") {
    return (
      <div className="w-8/10 m-auto rounded-2xl bg-blur">
        <PurchaseInformation />
      </div>
    );
  } else if (admin === "memberShip") {
    return (
      <div className="w-8/10 m-auto rounded-2xl bg-blur">
        <MembershipInformation />
      </div>
    );
  }

  // Opción por defecto si `admin` no coincide con ninguno
  return (
    <div className="w-8/10 m-auto rounded-2xl bg-blur">
      <h2 className="text-center text-red-600">Error: Page not found</h2>
    </div>
  );
}
