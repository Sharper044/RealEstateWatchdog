select *
from rew_searches
join rew_users
on rew_searches.user_id = rew_users.user_id;