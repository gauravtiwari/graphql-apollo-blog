QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "Query root for Schema"

  field :posts, PostType do
    description 'Post collections'
    resolve -> (obj, args, ctx) { Post.all.includes(:user) }
  end
end
