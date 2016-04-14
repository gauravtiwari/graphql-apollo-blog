QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "Query root for Schema"

  field :posts, types[PostType] do
    argument :first, types.Int, default_value: 20
    description 'Post collections'
    resolve -> (obj, args, ctx) {
      Post.all.includes(:user).limit(args[:first])
    }
  end
end
