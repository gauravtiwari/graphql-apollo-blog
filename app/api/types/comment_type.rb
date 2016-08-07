CommentType = GraphQL::ObjectType.define do
  name 'Comment'
  description 'A single comment entry returns a comment'

  # Expose fields associated with Comment model
  field :id, !types.ID, 'The id of the comment'
  field :body, types.String, 'The body of this comment'
  field :created_at, types.String, 'The time at which this comment was created'
  field :user, UserType, 'Owner of this comment'
end
