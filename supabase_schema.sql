-- Required tables for the @next-auth/supabase-adapter

-- Create the users table
CREATE TABLE IF NOT EXISTS next_auth.users (
    id uuid NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

-- Create the accounts table
CREATE TABLE IF NOT EXISTS next_auth.accounts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT "provider_providerAccountId_unique" UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE
);

-- Create the sessions table
CREATE TABLE IF NOT EXISTS next_auth.sessions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "sessionToken" text NOT NULL,
    "userId" uuid,
    expires timestamp with time zone,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT "sessionToken_unique" UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE
);

-- Create the verification_tokens table
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
    token text NOT NULL,
    identifier text NOT NULL,
    expires timestamp with time zone,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token, identifier)
);
