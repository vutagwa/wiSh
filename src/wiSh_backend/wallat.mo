import DfxResult "mo:base/DfxResult";

// Define the Wallet actor
actor Wallet {

  // Define a data model for the WishCoins balance and transaction history
  type Wallet = {
    balance: Nat;
    transactions: [Transaction];
  };

  type Transaction = {
    type: Text; 
    amount: Nat;
    recipient: Text; 
  };

  // Maintain a mapping of user wallets
  var wallets: HashMap<Text, Wallet> = HashMap.fromPairs([]);

  // Initialize the Wallet with a user for testing
  init() : async () {
    wallets.put("user1", { balance = 100; transactions = [] });
  }

  // Function to donate WishCoins to a campaign
  public func donateWishCoins(userId: Text, campaignId: Nat, amount: Nat) : async DfxResult {
    switch (wallets.get(userId)) {
      case (?userWallet) {
        if (userWallet.balance >= amount) {
          // Update the user's WishCoins balance
          userWallet.balance -= amount;
          userWallet.transactions.push({
            type = "donate";
            amount;
            recipient = "campaign_" # Nat.toText(campaignId);
          });

          // Update the wallet
          wallets.put(userId, userWallet);

          return #ok();
        } else {
          return #err("Insufficient WishCoins balance");
        }
      };
      case (_) {
        return #err("User not found");
      };
    }
  }

  // Function to send WishCoins to another user
  public func sendWishCoins(senderId: Text, recipientId: Text, amount: Nat) : async DfxResult {
    switch (wallets.get(senderId)) {
      case (?senderWallet) {
        if (senderWallet.balance >= amount) {
          switch (wallets.get(recipientId)) {
            case (?recipientWallet) {
              // Update sender's wallet
              senderWallet.balance -= amount;
              senderWallet.transactions.push({
                type = "send";
                amount;
                recipient = recipientId;
              });
              wallets.put(senderId, senderWallet);

              // Update recipient's wallet
              let updatedRecipientWallet = {
                balance = recipientWallet.balance + amount;
                transactions = recipientWallet.transactions;
              };
              updatedRecipientWallet.transactions.push({
                type = "receive";
                amount;
                recipient = senderId;
              });
              wallets.put(recipientId, updatedRecipientWallet);

              return #ok();
            };
            case (_) {
              return #err("Recipient not found");
            };
          }
        } else {
          return #err("Insufficient WishCoins balance");
        }
      };
      case (_) {
        return #err("Sender not found");
      };
    }
  }

  // Expose an API endpoint to get the user's WishCoins balance
  public query func getWishCoinsBalance(userId: Text) : async Nat {
    switch (wallets.get(userId)) {
      case (?userWallet) {
        return userWallet.balance;
      };
      case (_) {
        return 0; // Return 0 if user is not found
      };
    }
  }
}
