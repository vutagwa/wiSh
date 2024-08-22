import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor DonationHub {
    type Donation = {
        donor: Text;
        amount: Nat;
        cause: Text;
        timestamp: Time.Time;
    };

    var donations: [Donation] = [];
    var tokenBalance: Nat = 0;

    // Function to donate tokens
    public func donate(donor: Text, amount: Nat, cause: Text) : async Text {
        if (amount <= 0) {
            return "Donation amount must be greater than 0.";
        };
        if (amount > tokenBalance) {
            return "Insufficient tokens.";
        };

        let newDonation: Donation = {
            donor = donor;
            amount = amount;
            cause = cause;
            timestamp = Time.now();
        };
        donations := Array.append(donations, [newDonation]);
        tokenBalance -= amount;

        return "Donation successful!";
    };

    // Function to get the list of donations
    public query func getDonations() : async [Donation] {
        return donations;
    };

    // Function to get the current token balance
    public query func getTokenBalance() : async Nat {
        return tokenBalance;
    };
};
