"use client";
import { UpdateBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/use-fetch";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BudgetProgress = ({ initialBudget, currentExpense }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || "",
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(UpdateBudget);
  const handleUpadteBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount < 0) {
      toast.error("Please enter a valid non-negative number for the budget.");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      toast.success("Budget updated successfully.");
      setIsEditing(false);
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to update budget.");
    }
  }, [error]);

  const handleCancelEdit = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  const percentage = initialBudget
    ? Math.min((currentExpense / initialBudget.amount) * 100, 100)
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle>Monthly Budget (Default Account) </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter new budget"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleUpadteBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget
                    ? `₹${currentExpense.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div>
            <Progress value={percentage} 
              extraStyles={`${
                percentage >=90
                ? "bg-red-500"
                : percentage >= 75
                ? "bg-yellow-500"
                : "bg-green-500"
              }`}
            />
            <p className="text-sm text-muted-foreground text-right">
              {percentage.toFixed(1)}% of budget used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
