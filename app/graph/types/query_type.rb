QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "Query root for Schema"

  field :posts, types[PostType] do
    description 'Post collections'
    resolve -> (object, object, context) {
      @posts = Post.all.includes(:user)
    }
  end

  field :post do
    type PostType
    description "Find a Post by id"
    argument :id, !types.ID
    resolve -> (object, object, context) {
      Post.find(arguments["id"])
    }
  end
end
