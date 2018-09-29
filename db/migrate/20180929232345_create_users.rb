class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :avatar_url
      t.string :email
      t.string :uid
      t.string :provider
      t.string :oauth_token, null: false

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :oauth_token, unique: true
  end
end
