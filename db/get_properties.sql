SELECT *
FROM rew_properties
WHERE $2 = $1 AND list_price <= $3;