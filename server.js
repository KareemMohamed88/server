const {
  express,
  morgan,
  dotenv,
  ProductRoutes,
  AuthRoutes,
  UserVerification,
  CategoriesRoutes,
  cookieParser,
  cors,
} = require("./imports/require");
const dbConnection = require("./config/conn");

const app = express();
dotenv.config({ path: "./config.env" });

dbConnection();
const origin = [
  "http://localhost:3000",
  "https://themepen.vercel.app",
  "http://127.0.0.1:8080",
  "http://localhost:3002/"
];

app.use(
  cors({
    origin: origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

if (process.env.ENV_MODE == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.ENV_MODE}`);
}

app.get("/", (req, res) => {
  res.json({
    app: {
      status: 200,
      routes: {
        UserVerification: "/",
        auth: "/api/v2/auth",
        products: "/api/v1/products",
        categories: "/api/v1/categories",
      },
      globalLink: "https://theme-pen-server.onrender.com/",
      anotherGlobalLink: "https://mushy-turtleneck-shirt-elk.cyclic.app/",
      frontendApp: "https://themepen.vercel.app/"
    },
  });
});

app.use("/", UserVerification);
app.use("/api/v2/auth", AuthRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/categories", CategoriesRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find this route ${req.originalUrl}`);
  next(err.message);
});

app.use((err, req, res, next) => {
  res.status(400).json({ err });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
