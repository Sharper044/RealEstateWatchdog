delete from rew_searches
where id = $1;

select *
from rew_searches
where user_id = $2;