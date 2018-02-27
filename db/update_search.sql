update rew_searches
set user_id = $1, location = $2, ammount = $3, cash_deal = $4, move_in = $5, rate = $6, sort_by = $7, email = $8
where id = $9;

select *
from rew_searches
where user_id = $1;