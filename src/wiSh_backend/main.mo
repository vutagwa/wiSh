import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";

actor UserManager {
    type User = {
        role: Text;
        passkey: Text;
    };

    stable var users: HashMap.Text<User> = HashMap.init();

    // Register a user
    public func register(username: Text, role: Text, passkey: Text) : async Text {
        if (HashMap.contains(users, username)) {
            return "User already registered.";
        };

        let user = {
            role = role;
            passkey = passkey;
        };

        users := HashMap.put(users, username, user);
        return "Registration successful.";
    };

    // Login a user
    public func login(username: Text, passkey: Text) : async Text {
        switch (HashMap.get(users, username)) {
            case (null) { return "User not found."; };
            case (?user) {
                if (user.passkey != passkey) {
                    return "Invalid passkey.";
                } else {
                    return user.role;
                }
            };
        }
    };

    // Utility function to check if a user exists
    public query func userExists(username: Text) : async Bool {
        return HashMap.contains(users, username);
    }
};
