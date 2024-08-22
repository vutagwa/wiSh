import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";

actor Wallet {
    // Initialize the HashMap with an initial capacity of 10
    var userBalances = HashMap.HashMap<Text, Nat>(10, Text.equal, Text.hash);

    // Function to deposit tokens into the wallet
    public func deposit(user: Text, amount: Nat) : async Text {
        if (amount <= 0) {
            return "Deposit amount must be greater than 0.";
        };
        let currentBalance = switch (userBalances.get(user)) {
            case (?bal) bal;
            case (null) 0;
        };
        userBalances.put(user, currentBalance + amount);
        return "Deposit successful!";
    };

    // Function to withdraw tokens from the wallet
    public func withdraw(user: Text, amount: Nat) : async Text {
        if (amount <= 0) {
            return "Withdrawal amount must be greater than 0.";
        };
        let currentBalance = switch (userBalances.get(user)) {
            case (?bal) bal;
            case (null) 0;
        };
        if (amount > currentBalance) {
            return "Insufficient funds.";
        };
        userBalances.put(user, currentBalance - amount);
        return "Withdrawal successful!";
    };

    // Function to get token balance of a user
    public query func getBalance(user: Text) : async Nat {
        return switch (userBalances.get(user)) {
            case (?bal) bal;
            case (null) 0;
        };
    };
};
