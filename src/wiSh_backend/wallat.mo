// wallet.mo

import DfxResult "mo:base/DfxResult";

actor Wallet {
  // Define a data model for the WishCoins balance and transaction history
  type Wallet = {
    balance: Nat;
    transactions: [Transaction];
  };

  type Transaction = {
    type: Text; // e.g., "send" or "donate"
    amount: Nat;
    recipient: Text; // optional
  };

  // Initialize the WishCoins balance and transaction history
  let wallets: [Wallet] = [{ balance = 100; transactions = [] }];

  // Function to update the WishCoins balance when a user donates to a campaign
  public func donateWishCoins(campaignId: Nat, amount: Nat) : async DfxResult {
    // Verify the user's WishCoins balance has sufficient amount
    let userWallet = wallets[0];
    if (userWallet.balance >= amount) {
      // Update the campaign's raised amount
      // (assuming you have a separate data model for campaigns)

      // Update the user's WishCoins balance
      userWallet.balance -= amount;
      userWallet.transactions.push({
        type = "donate";
        amount;
        recipient = "";
      });

      // Update the WishCoins balance and transaction history
      wallets[0] := userWallet;

      return #ok();
    } else {
      return #err("Insufficient WishCoins balance");
    }
  }

  // Expose an API endpoint to get the user's WishCoins balance
  public query func getWishCoinsBalance() : async Nat {
    return wallets[0].balance;
  }
}