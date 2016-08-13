QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'Query root for Schema'

  field :posts do
    type types[PostType]
    description 'Post collections'
    argument :first, !types.Int
    argument :start, !types.Int
    resolve -> (object, arguments, context) { resolve_posts(arguments) }
  end

  field :post do
    type PostType
    description 'Find a Post by id'
    argument :id, !types.ID
    resolve -> (object, arguments, context) { resolve_post(arguments) }
  end

  field :current_user do
    type UserType
    description 'Find current logged in user'
    resolve -> (object, arguments, context) {
      context[:current_user] ? context[:current_user] : nil
    }
  end
end

def resolve_post(arguments)
  Post.eager_load(
    :user, { comments: :user }
  ).find(arguments['id'])
end

def resolve_posts(arguments)
  Post.eager_load(:user).offset(arguments['start']).limit(arguments['first'])
end
