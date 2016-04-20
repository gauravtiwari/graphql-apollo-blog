QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "Query root for Schema"

  field :posts, types[PostType] do
    description 'Post collections'
    resolve -> (obj, args, ctx) {
      @posts = Post.all.includes(:user)
    }
  end
end
