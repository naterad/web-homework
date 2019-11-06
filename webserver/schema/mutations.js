const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLInt } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { MerchantModel } = require('../data-models/Merchant')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // USERS
    addUser: {
      type: UserType,
      args: {
        dob: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { dob, firstName, lastName }) {
        return (new UserModel({ dob, firstName, lastName })).save()
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        dob: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, dob, firstName, lastName }) {
        return UserModel.findOneAndUpdate({ _id: id, dob, firstName, lastName })
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id }) {
        return UserModel.findByIdAndDelete({ _id: id })
      }
    },
    deleteAllUsers: {
      type: UserType,
      /* eslint-disable-next-line camelcase */
      resolve () {
        return UserModel.deleteMany()
      }
    },
    // TRANSACTIONS
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLString },
        timestamp: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, timestamp }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, timestamp })).save()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLString },
        timestamp: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return TransactionModel.findOneAndUpdate({ user_id, description, merchant_id, debit, credit, amount })
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id }) {
        return TransactionModel.findByIdAndDelete({ _id: id })
      }
    },
    deleteAllTransactions: {
      type: TransactionType,
      /* eslint-disable-next-line camelcase */
      resolve () {
        return TransactionModel.deleteMany()
      }
    },
    // MERCHANTS
    addMerchant: {
      type: MerchantType,
      args: {
        merchantName: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { merchantName }) {
        return (new MerchantModel({ merchantName })).save()
      }
    },
    updateMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString },
        merchantName: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, merchantName }) {
        return MerchantModel.findOneAndUpdate({ _id: id, merchantName })
      }
    },
    deleteMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id }) {
        return MerchantModel.findByIdAndDelete({ _id: id })
      }
    },
    deleteAllMerchants: {
      type: MerchantType,
      /* eslint-disable-next-line camelcase */
      resolve () {
        return MerchantModel.deleteMany()
      }
    },
  }
})

module.exports = mutation
