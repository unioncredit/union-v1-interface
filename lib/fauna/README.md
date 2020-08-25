# FaunaDB

Documentation for the custom Index and UDF for FaunaDB usage. Paired with the `schema.graphql` file also in this folder as the database structure

## Custom Index

##### `all_signups_ts_by_sentGoldenTicket_flag`

Needed to find the index of the signup in the User-Defined Function `find_place_in_line`.

```js
CreateIndex({
  name: "all_signups_ts_by_sentGoldenTicket_flag",
  source: Collection("Signup"),
  terms: [
    {
      field: ["data", "sentGoldenTicket"],
    },
  ],
  values: [
    {
      field: ["ts"],
    },
  ],
});
```

## Functions

##### `find_place_in_line`

The function to return the position of the email in the signups which haven't been sent invites, as well as the total of the signups remaining, additionally returns if the entered email has been sent a golden ticket yet

```js
Query(
  Lambda(
    "email",
    Let(
      {
        ts: Select(
          "ts",
          Get(Match(Index("find_signup_by_email"), Var("email")))
        ),
        hasGoldenTicket: Select(
          ["data", "sentGoldenTicket"],
          Get(Match(Index("find_signup_by_email"), Var("email")))
        ),
      },
      {
        position: Count(
          Range(
            Match(Index("all_signups_ts_by_sentGoldenTicket_flag"), false),
            0,
            Var("ts")
          )
        ),
        total: Count(
          Match(Index("all_signups_by_sentGoldenTicket_flag"), false)
        ),
        hasGoldenTicket: Var("hasGoldenTicket"),
      }
    )
  )
);
```

##### `get_waitlist_total`

```js
Query(
  Lambda("", Count(Match(Index("all_signups_by_sentGoldenTicket_flag"), false)))
);
```
