const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull
} = graphql

// Scalar Type
/*
    String
    int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name: "Person",
    description: "Represents a person",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString) },
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        } 
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                return {
                    name: "Antonio",
                    age: 32,
                    isMarried: true,
                    gpa: 4.0
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})
