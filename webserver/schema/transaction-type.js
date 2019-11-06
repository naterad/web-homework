const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = graphql

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
	  amount: { type: GraphQLString },
	  timestamp: { type: GraphQLString }
  })
})

module.exports = TransactionType
