import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login"
  }
});

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/productos/:path*", "/admin/categorias/:path*", "/admin/marcas/:path*", "/admin/slides/:path*", "/admin/faqs/:path*", "/admin/usuarios/:path*", "/admin/solicitudes/:path*", "/admin/promociones/:path*", "/admin/configuracion/:path*"]
};
