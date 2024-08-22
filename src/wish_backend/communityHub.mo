import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor CommunityHub {
    type Post = {
        id: Nat;
        author: Text;
        content: Text;
        upvotes: Nat;
        downvotes: Nat;
        timestamp: Time.Time;
    };

    var posts: [Post] = [];
    var tokenBalance: Nat = 0;
    var postCounter: Nat = 0;

    public func createPost(author: Text, content: Text) : async Text {
        let newPost: Post = {
            id = postCounter;
            author = author;
            content = content;
            upvotes = 0;
            downvotes = 0;
            timestamp = Time.now();
        };
        posts := Array.append(posts, [newPost]);
        postCounter += 1;
        return "Post created successfully!";
    };

    public func upvote(postId: Nat) : async Text {
    let result = switch (Array.find<Post>(posts, func(p : Post) { p.id == postId })) {
        case (?post) {
            let updatedPost = {
                id = post.id;
                author = post.author;
                content = post.content;
                upvotes = post.upvotes + 1;
                downvotes = post.downvotes;
                timestamp = post.timestamp;
            };
            posts := Array.map<Post, Post>(posts, func(x : Post) { if (x.id == postId) updatedPost else x });

            // Reward tokens for every 20 upvotes
            if (updatedPost.upvotes % 20 == 0) {
                tokenBalance += 10; 
            };

            "Upvote successful!";
        };
        case (null) {
            "Post not found!"
        };
    };
    return result;
};

public func downvote(postId: Nat) : async Text {
    let result = switch (Array.find<Post>(posts, func(p : Post) { p.id == postId })) {
        case (?post) {
            let updatedPost = {
                id = post.id;
                author = post.author;
                content = post.content;
                upvotes = post.upvotes;
                downvotes = post.downvotes + 1;
                timestamp = post.timestamp;
            };
            posts := Array.map<Post, Post>(posts, func(x : Post) { if (x.id == postId) updatedPost else x });
            "Downvote successful!";
        };
        case (null) {
            "Post not found!"
        };
    };
    return result;
};

    public query func getPosts() : async [Post] {
        return posts;
    };

    public query func getTokenBalance() : async Nat {
        return tokenBalance;
    };
};
