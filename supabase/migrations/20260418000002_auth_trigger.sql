-- 신규 유저 가입 시 profiles 테이블에 자동 삽입
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, name, email)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'solopreneur'),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
