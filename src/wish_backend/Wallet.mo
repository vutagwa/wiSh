import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";

actor Wallet {
    var userBalances = HashMap.HashMap<Text, Nat.Nat>(10, Text.equal, Text.hash);
    var transactionHistory = HashMap.HashMap<Text, [Text]>(10, Text.equal, Text.hash); // Stores transaction history per user

    func ensureUserBalance(user: Text) : () {
        switch (userBalances.get(user)) {
            case (null) {
                userBalances.put(user, 1000);
                transactionHistory.put(user, []);
            };
            case (_) {};
        };
    };

    public func deposit(user: Text, amount: Nat.Nat) : async Text {
    ensureUserBalance(user);
    if (amount <= 0) {
        return "Deposit amount must be greater than 0.";
    };
    let currentBalance = switch (userBalances.get(user)) {
        case (?bal) bal;
        case (null) 0;
    };
    userBalances.put(user, currentBalance + amount);
    let history = switch (transactionHistory.get(user)) {
        case (?hist) hist;
        case (null) [];
    };
    transactionHistory.put(user, Array.append(history, ["Deposited: " # Nat.toText(amount)]));
    return "Deposit successful!";
};

public func withdraw(user: Text, amount: Nat.Nat) : async Text {
    ensureUserBalance(user);
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
    let history = switch (transactionHistory.get(user)) {
        case (?hist) hist;
        case (null) [];
    };
    transactionHistory.put(user, Array.append(history, ["Withdrew: " # Nat.toText(amount)]));
    return "Withdrawal successful!";
};

public func sendTokens(sender: Text, recipient: Text, amount: Nat.Nat) : async Text {
    ensureUserBalance(sender);
    ensureUserBalance(recipient);
    if (amount <= 0) {
        return "Send amount must be greater than 0.";
    };
    let senderBalance = switch (userBalances.get(sender)) {
        case (?bal) bal;
        case (null) 0;
    };
    if (amount > senderBalance) {
        return "Insufficient funds.";
    };
    userBalances.put(sender, senderBalance - amount);
    let recipientBalance = switch (userBalances.get(recipient)) {
        case (?bal) bal;
        case (null) 0;
    };
    userBalances.put(recipient, recipientBalance + amount);
    let senderHistory = switch (transactionHistory.get(sender)) {
        case (?hist) hist;
        case (null) [];
    };
    let recipientHistory = switch (transactionHistory.get(recipient)) {
        case (?hist) hist;
        case (null) [];
    };
    transactionHistory.put(sender, Array.append(senderHistory, ["Sent: " # Nat.toText(amount) # " to " # recipient]));
    transactionHistory.put(recipient, Array.append(recipientHistory, ["Received: " # Nat.toText(amount) # " from " # sender]));
    return "Transaction successful!";
};

    public query func getBalance(user: Text) : async Nat.Nat {
        return switch (userBalances.get(user)) {
            case (?bal) bal;
            case (null) 1000;
        };
    };

    public query func getTransactionHistory(user: Text) : async [Text] {
        return switch (transactionHistory.get(user)) {
            case (?hist) hist;
            case (null) [];
        };
    };
};
