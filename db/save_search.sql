insert into rew_searches (user_id, location, ammount, cash_deal, move_in, rate, sort_by, email)
values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;

