import Time "mo:base/Time";
import Array "mo:base/Array";


actor CaseReportingSystem {
    type Case = {
        location: Text;
        date: Time.Time;
        description: Text;
        offenderPic: ?Blob;
    };

    var cases: [Case] = [];
    var tokenBalance: Nat = 0;

    // Function to submit a case
    public func submitCase(location: Text, date: Time.Time, description: Text, offenderPic: ?Blob) : async Text {
        let newCase: Case = {
            location = location;
            date = date;
            description = description;
            offenderPic = offenderPic;
        };
        cases := Array.append(cases, [newCase]);

        // Reward user with tokens
        tokenBalance += 156; 

        return "Case submitted successfully!";
    };

    // Function to get the list of reported cases
    public query func getCases() : async [Case] {
        return cases;
    };

    // Function to get the current token balance
    public query func getTokenBalance() : async Nat {
        return tokenBalance;
    };
};
