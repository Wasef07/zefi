import { getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/budget_progress";

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((acc) => acc.isDefault);
  
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  
  return (
    <div className="px-5 space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress initialBudget={budgetData?.budget } currentExpense={budgetData?.currentExpense || 0} />
      )}



      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        <CreateAccountDrawer>
          <div className="cursor-pointer h-full">
            <Card className="hover:shadow-md transition-shadow border-dashed h-full">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </div>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
}

export default DashboardPage;
