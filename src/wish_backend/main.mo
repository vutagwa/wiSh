import Principal "mo:base/Principal";

actor Auth {
  public shared (msg) func whoami() : async Principal {
    return msg.caller;
  };


};