import { CaseData } from "@/app/types/cases";

export const cases: CaseData[] = [
  {
    id: "735109",
    subject: "We're confused",
    accountName: "Kaiser",
    status: "Open",
    opened: "8/2/2023 10:12 AM",
    hibernateDate: "8/20/2023",
    isTamCase: true,
    description:
      "Another crazy case... You explained it to us and we said we understood but we did something different than what you said to do. The thing we did didn't work even though you said that it wouldn't. Please tell us how to do this.",
    comments: [
      {
        id: 1,
        user: "Nick",
        public: false,
        createDate: new Date(),
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
      {
        id: 2,
        user: "Nick",
        public: true,
        createDate: new Date(),
        comment:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      },
    ],
  },
  {
    id: "744068",
    subject: "Stuff is broken",
    accountName: "Needy Customer",
    status: "Closed",
    opened: "5/19/2021 1:40 PM",
    hibernateDate: null,
    isTamCase: false,
    description:
      "It broke all by itself. Everything was working fine until I changed something and since then it doesn't work anymore. What happened?",
    comments: [
      {
        id: 1,
        user: "Nick",
        public: false,
        createDate: new Date(),
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
      {
        id: 2,
        user: "Nick",
        public: true,
        createDate: new Date(),
        comment:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      },
    ],
  },
  {
    id: "758711",
    subject: "Help!",
    accountName: "Cool customer",
    status: "Open",
    opened: "7/17/2023 6:58 AM",
    hibernateDate: null,
    isTamCase: false,
    description: "I don't know what I'm doing.",
    comments: [
      {
        id: 1,
        user: "Nick",
        public: false,
        createDate: new Date(),
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
      {
        id: 2,
        user: "Nick",
        public: true,
        createDate: new Date(),
        comment:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      },
    ],
  },
  {
    id: "721906",
    subject: "Upgrade to 9.5",
    accountName: "Microsoft",
    status: "Open",
    opened: "8/4/2023 11:10 AM",
    hibernateDate: null,
    isTamCase: false,
    description: "What is the upgrade process?",
    comments: [
      {
        id: 1,
        user: "Nick",
        public: false,
        createDate: new Date(),
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
      {
        id: 2,
        user: "Nick",
        public: true,
        createDate: new Date(),
        comment:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      },
    ],
  },
];
