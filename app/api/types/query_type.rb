QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'Query root for Schema'

  field :posts do
    type types[PostType]
    description 'Post collections'
    argument :page, !types.Int
    resolve -> (object, arguments, context) { resolve_posts(arguments) }
  end

  field :total_pages do
    type types.Int
    description 'Return number of posts'
    resolve -> (object, arguments, context) { Post.paginate(per_page: 20, page: 1).total_pages }
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
  Post.eager_load(:user).paginate(
    page: arguments['page'], per_page: 20
  ).order(id: :desc)
end
