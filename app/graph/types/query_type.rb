QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "Query root for Schema"

  field :posts do
    type types[PostType]
    description 'Post collections'
    argument :first, !types.Int
    resolve -> (object, arguments, context) {
      @posts = Post.all.includes(:user).limit(arguments["first"])
    }
  end

  field :post do
    type PostType
    description "Find a Post by id"
    argument :id, !types.ID
    resolve -> (object, arguments, context) {
      Post.find(arguments["id"])
    }
  end

  field :current_user do
    type UserType
    description "Find current logged in user"
    resolve -> (object, arguments, context) {
      context[:current_user] ? context[:current_user] : nil
    }
  end
end
