import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const UpdateDataDialog = ({
  handleUpdateDataset,
  fetchTransactions,
  disabled,
  loading,
  updating,
}) => {
  const [sms, setSms] = useState([]); // Stores SMS transactions
  const [selectedSms, setSelectedSms] = useState([]); // Tracks selected SMS IDs

  // Fetch transactions on dialog open
  const getSMS = async () => {
    try {
      const response = await fetchTransactions();
      const smsArray = Object.entries(response).map(([id, data]) => ({
        id,
        ...data,
      })); // Convert response object into an array with 'id' included
      setSms(smsArray);
    } catch (err) {
      console.error("Error fetching SMS:", err);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedSms(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((smsId) => smsId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not already selected
    );
  };

  // Handle label change for dropdown
  const handleLabelChange = (id, newLabel) => {
    setSms((prevSms) =>
      prevSms.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  // Handle the update action
  const handleUpdate = async () => {
    const transactionsToUpdate = sms.filter((item) =>
      selectedSms.includes(item.id)
    );
    try {
      for (const transaction of transactionsToUpdate) {
        await handleUpdateDataset(transaction.id, transaction.label); // Update each transaction
      }
      setSelectedSms([]); // Clear selection after update
    } catch (err) {
      console.error("Error updating transactions:", err);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && getSMS()}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={disabled || loading || updating}
        >
          {updating ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Updating...
            </div>
          ) : (
            "Update Dataset"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Dataset</DialogTitle>
          <DialogDescription>
            Select the transactions you want to update and choose their labels.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-auto mt-4">
          {sms.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            sms.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 border-b py-2"
              >
                <input
                  type="checkbox"
                  checked={selectedSms.includes(transaction.id)}
                  onChange={() => handleCheckboxChange(transaction.id)}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{transaction.sender}</p>
                  <p className="text-xs text-gray-600">
                    {transaction.timestamp}
                  </p>
                  <p className="text-sm mt-2">{transaction.message}</p>
                  <div className="mt-2">
                    <label className="text-xs">Label:</label>
                    <select
                      value={transaction.label || "ham"}
                      onChange={(e) =>
                        handleLabelChange(transaction.id, e.target.value)
                      }
                      className="ml-2 border rounded px-2 py-1"
                    >
                      <option value="ham">Ham</option>
                      <option value="spam">Spam</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={selectedSms.length === 0}
              >
                {updating ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" /> Updating...
                  </div>
                ) : (
                  "Update Selected"
                )}
              </Button>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDataDialog;
