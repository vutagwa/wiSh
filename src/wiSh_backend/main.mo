actor UserManager {
    type User = {
        role: Text;
        passkey: Text;
    };

    stable var users: HashMap<Text, User> = HashMap<Text, User>();

    // Initialize the actor with predefined users
    shared({caller}) func init() {
        users := HashMap.put(users, "admin", {role = "admin", passkey = "adminpass"});
        users := HashMap.put(users, "marion", {role = "user", passkey = "1121"});
        users := HashMap.put(users, "meriel", {role = "admin", passkey = "1111"});
    };

    public func register(username: Text, role: Text, passkey: Text) : async Text {
        if (await HashMap.contains(users, username)) {
            return "User already registered.";
        };

        let user = {
            role = role;
            passkey = passkey;
        };

        users := await HashMap.put(users, username, user);
        return "Registration successful.";
    };

    public func login(username: Text, passkey: Text) : async Text {
        switch (await HashMap.get(users, username)) {
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

    public query func userExists(username: Text) : async Bool {
        return await HashMap.contains(users, username);
    }
};
