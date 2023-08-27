const graphql = require('graphql');
const { ObjectId } = require("mongodb")

const User = require("../model/user")
const Post = require("../model/post")
const Hobby = require("../model/hobby")

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull
} = graphql
  
// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: "Documentation for user...",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type:GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                const posts = Post.find({userId: parent.id})
                return posts;
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                const hobbies = Hobby.find();
                return hobbies;
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Documenttation for hobby",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                const user = User.find({userId: parent.userId}) 
                return user;
            }
        }
    })
    
})

// id, comment
const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Documenation for the Post type",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                const user = User.find({userId: parent.userId}) 
                return user;
            }
        },
        
    })
})


// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                const user = User.find({id: args.id});
                return user;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                const users = User.find();
                return users; 
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                const hobby = Hobby.find({id: args.id}) 
                return hobby;
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                const hobbies = Hobby.find();
                return hobbies; 
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                const post = Post.find({_id: new ObjectId(args.id)});
                return post;
            }
        },
        
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                const posts = Post.find();
                return posts;
            }
        }

    }
});

// mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                //id: {type: GraphQLID}
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: new GraphQLNonNull(GraphQLString)},
            },

            resolve(parent, args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })

                return user.save();
            }
        },

        updateUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString},
            },
            resolve(parent, args) {
                return updatedUsr = User.findByIdAndUpdate(args.id, args, {new: true})
            }
        },

        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID}
                comment: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },

            resolve(parent, args) {
                return Post({ comment: args.comment, userId: args.userId}).save();
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Hobby({
                    userId: args.userId,
                    title: args.title,
                    description: args.description
                }).save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
