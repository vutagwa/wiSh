actor ReportCase {

    // Define types
    type CrimeReport = {
        id: Int;
        location: Text;
        date: Int;
        incidentType: Text;
        description: Text;
        victimName: ?Text;
        offenderPicture: ?Blob;
    };

    type Transaction = {
        type: Text;
        amount: Int;
        recipient: ?Text;
    };

    // Initialize variables
    let reports : Map.Int<CrimeReport> = Map.empty();
    var wishCoinsBalance : Int = 0;
    var transactionHistory : [Transaction] = [];

    // Public functions
    public func addReport(location: Text, date: Int, incidentType: Text, description: Text, victimName: ?Text, offenderPicture: ?Blob) : async Int {
        let reportId = reports.size();
        reports.put(reportId, {
            id = reportId;
            location = location;
            date = date;
            incidentType = incidentType;
            description = description;
            victimName = victimName;
            offenderPicture = offenderPicture;
        });
        return reportId;
    };

    public func getReport(id: Int) : async ?CrimeReport {
        return reports.get(id);
    };

    public func listReports() : async [CrimeReport] {
        return reports.values();
    };

    public func addWishCoins(amount: Int) : async () {
        wishCoinsBalance += amount;
    };

    public func sendWishCoins(amount: Int, recipient: Text) : async () {
        wishCoinsBalance -= amount;
        transactionHistory := Array.append(transactionHistory, [{
            type = "send";
            amount = amount;
            recipient = ?recipient;
        }]);
    };

    public func receiveWishCoins(amount: Int) : async () {
        wishCoinsBalance += amount;
        transactionHistory := Array.append(transactionHistory, [{
            type = "receive";
            amount = amount;
            recipient = null;
        }]);
    };

    public func getWishCoinsBalance() : async Int {
        return wishCoinsBalance;
    };

    public func getTransactionHistory() : async [Transaction] {
        return transactionHistory;
    };
};
