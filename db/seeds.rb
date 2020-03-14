# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
COMMENTS = [
             {
               "name": "George",
               "comment": "Very beautiful sky",
               "timeStamp": "12"
             },
             {
               "name": "Isabella",
               "comment": "I like this bag",
               "timeStamp": "26",
               "highlight": [{"pageX": 57, "pageY": 38}]
             },
             {
               "name": "Sofia",
               "comment": "Who is it?",
               "timeStamp": "56",
               "highlight": [{"pageX": 55, "pageY": 28}]
             }
           ]

COMMENTS.each do |comment|
  Comment.create(comment)
end