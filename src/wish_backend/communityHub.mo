import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor CommunityHub {
    type Post = {
        id: Nat;
        author: Text;
        content: Text;
        upvotes: Nat;
        downvotes: Nat;
        timestamp: Time.Time;
    };

    var posts: [Post] = [
        { id = 0; author = "Alice"; content = "This is a demo post."; upvotes = 5; downvotes = 2; timestamp = Time.now() },
        { id = 1; author = "Bob"; content = "Another demo post."; upvotes = 3; downvotes = 1; timestamp = Time.now() },
        { id = 2; author = "Charlie"; content = "Yet another demo post."; upvotes = 10; downvotes = 0; timestamp = Time.now() }
    ];

    var tokenBalance: Nat = 0;
    var postCounter: Nat = 3; // Initialize postCounter to 3 since we already have 3 demo posts

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
}