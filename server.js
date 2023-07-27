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

app.use(
  cors({
    origin: ["https://themepen.vercel.app"],
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
  res.send("app runed");
});


app.use("/", UserVerification);
app.use("/api/v2/auth", AuthRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/categories", CategoriesRoutes);


app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
