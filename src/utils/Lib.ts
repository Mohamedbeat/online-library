"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";

const bcrypt = require("bcryptjs");
// import * as bcrypt from "bcrypt";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  // const user = { email: formData.get("email"), name: "John" };

  const userInput = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  if (!userInput.email) {
    throw new Error("Please enter your email");
  }
  if (!userInput.password) {
    throw new Error("Please enter your password");
  }
  const foundUser = await prisma.user.findFirst({
    where: {
      email: formData.get("email")?.toString(),
    },
  });
  // console.log(foundUser);
  if (!foundUser) {
    throw new Error("Wrong email or password");
  }

  const passwordCorrect = await bcrypt.compare(
    userInput.password as string,
    foundUser.password
  );

  if (!passwordCorrect) {
    // console.log(foundUser.password);

    throw new Error("Wrong email or password");
  }
  const payload = {
    name: foundUser.name,
    email: foundUser.email,
    id: foundUser.id,
  };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const expires2 = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  console.log(expires2);

  const session = await encrypt({ payload });

  // Save the session in a cookie
  cookies().set("session", session, { httpOnly: true, expires: expires2 });
}

export async function register(formData: FormData) {
  const userInput = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    cpassword: formData.get("cpassword")?.toString(),
  };
  if (!userInput.name) {
    throw new Error("Please enter your name");
  }
  if (!userInput.email) {
    throw new Error("Please enter your email");
  }
  if (!userInput.password) {
    throw new Error("Please enter a password");
  }
  if (!userInput.cpassword) {
    throw new Error("Please confirm the password");
  }

  const foundUser = await prisma.user.findFirst({
    where: {
      email: userInput.email,
    },
  });

  if (foundUser) {
    throw new Error("User already exist.");
  }

  if (userInput.cpassword !== userInput.password) {
    throw new Error("Please check your password");
  }

  const hashedPass = await bcrypt.hash(userInput.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email: userInput.email,
      name: userInput.name,
      password: hashedPass,
    },
  });

  const payload = {
    name: createdUser.name,
    email: createdUser.email,
    id: createdUser.id,
  };

  const expires = new Date(Date.now() + 10 * 1000);
  const expires2 = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ payload });

  // Save the session in a cookie
  cookies().set("session", session, { expires: expires2, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  cookies().delete("session");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    // return redirect("/login");
    // return NextResponse.redirect(new URL("/login", request.url));
    return;
  }

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
export async function getAllCategories() {
  const categories = await prisma.category.findMany();
  // console.log(categories);
  return categories;
}
export async function getPopularCategories() {
  const categories = await prisma.category.findMany({
    include: {
      article: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      article: {
        _count: "desc",
      },
    },
    take: 4,
  });
  // console.log(categories);
  return categories;
}

export async function getCatById(id: string) {
  const catId = parseInt(id);

  // console.log(id);

  const res = await prisma.article.findMany({
    where: {
      category: {
        id: {
          equals: catId,
        },
      },
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return res;
  // console.log(res);
}

export async function getArticleById(id: string) {
  const artId = parseInt(id);

  // console.log(id);

  const res = await prisma.article.findFirst({
    where: {
      id: {
        equals: artId,
      },
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          category: true,
        },
      },
    },
  });

  if (res) {
    const updatedArticle = await prisma.article.update({
      where: {
        id: artId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            category: true,
          },
        },
      },
      data: {
        reads: res.reads + 1,
      },
    });

    // Return the updated article
    return updatedArticle;
  }

  return res;
}
export async function getAllArticles() {
  // console.log(id);

  const res = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return res;
}
export async function getLatestArticles() {
  // console.log(id);

  const res = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          category: true,
        },
      },
    },
    take: 4,
  });
  return res;
}

export async function getProfileById(id: string) {
  const Intid = parseInt(id);
  const res = await prisma.user.findFirst({
    where: {
      id: {
        equals: Intid,
      },
    },
    select: {
      id: true,
      bio: true,
      email: true,
      createdAt: true,
      name: true,
      article: true,
    },
    // include: {
    //   Article: {
    //     select: {
    //       id: true,
    //       title: true,
    //       createdAt: true,
    //     },
    //   },
    //   _count: true,
    // },
  });

  return res;
}
export async function addArticle({
  catId,
  content,
  title,
}: {
  title: string;
  content: string;
  catId: string;
}) {
  const session = await getSession();
  if (!session) {
    throw new Error("You are not athenticated");
  }
  if (!title) {
    throw new Error("Please make sure you enter a title");
  }
  if (!catId) {
    throw new Error("Please make sure you select a category");
  }
  if (!content) {
    throw new Error("Please make sure you enter a content");
  }
  const newArticle = await prisma.article.create({
    data: {
      title: title,
      categoryId: parseInt(catId),
      content: content,
      authorId: session.payload.id,
    },
  });
  console.log(newArticle);
  revalidatePath("/");

  return newArticle;
}
export async function updateArticle({
  catId,
  content,
  title,
  artId,
}: {
  title: string;
  content: string;
  catId: string;
  artId: string;
}) {
  const session = await getSession();
  if (!session) {
    throw new Error("You are not athenticated");
  }

  const foundArticle = await prisma.article.findFirst({
    where: {
      id: {
        equals: parseInt(artId),
      },
    },
    include: {
      user: true,
      category: true,
    },
  });

  const isArtOwner = session.payload.id === foundArticle?.user.id;

  if (!isArtOwner) {
    throw new Error("You are not authorized");
  }

  if (!title) {
    throw new Error("Please make sure you enter a title");
  }
  if (!catId) {
    throw new Error("Please make sure you select a category");
  }
  if (!content) {
    throw new Error("Please make sure you enter a content");
  }
  const editedArticle = await prisma.article.update({
    where: {
      id: parseInt(artId),
    },
    data: {
      content: content,
      title: title,
      categoryId: parseInt(catId),
    },
  });
  console.log(editedArticle);
  revalidatePath("/");

  return editedArticle;
}

export async function deleteArticle(id: string) {
  const artID = parseInt(id);

  const foundArticle = await prisma.article.findFirst({
    where: {
      id: artID,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!foundArticle) {
    throw new Error("Article not found");
  }
  const session = await getSession();
  if (!session) {
    throw new Error("You are not athenticated");
  }
  if (session.payload.id !== foundArticle.authorId) {
    throw new Error("You are not authorized");
  }

  await prisma.article.delete({
    where: {
      id: artID,
    },
  });

  return true;
}
