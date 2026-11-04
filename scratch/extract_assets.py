import ctypes
from ctypes import c_void_p, c_int, c_double, c_char_p, c_size_t, Structure, byref, POINTER

# Load Frameworks
cg = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics")
iio = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/ImageIO.framework/ImageIO")
cf = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation")

class CGPoint(Structure):
    _fields_ = [("x", c_double), ("y", c_double)]

class CGSize(Structure):
    _fields_ = [("width", c_double), ("height", c_double)]

class CGRect(Structure):
    _fields_ = [("origin", CGPoint), ("size", CGSize)]

# CoreFoundation
cf.CFURLCreateFromFileSystemRepresentation.restype = c_void_p
cf.CFURLCreateFromFileSystemRepresentation.argtypes = [c_void_p, c_char_p, c_size_t, c_int]

cf.CFStringCreateWithCString.restype = c_void_p
cf.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, c_int]

cf.CFRelease.argtypes = [c_void_p]

# CoreGraphics
cg.CGPDFDocumentCreateWithURL.restype = c_void_p
cg.CGPDFDocumentCreateWithURL.argtypes = [c_void_p]

cg.CGPDFDocumentGetNumberOfPages.restype = c_size_t
cg.CGPDFDocumentGetNumberOfPages.argtypes = [c_void_p]

cg.CGPDFDocumentGetPage.restype = c_void_p
cg.CGPDFDocumentGetPage.argtypes = [c_void_p, c_size_t]

cg.CGPDFPageGetBoxRect.restype = CGRect
cg.CGPDFPageGetBoxRect.argtypes = [c_void_p, c_int]

cg.CGColorSpaceCreateDeviceRGB.restype = c_void_p

cg.CGBitmapContextCreate.restype = c_void_p
cg.CGBitmapContextCreate.argtypes = [c_void_p, c_size_t, c_size_t, c_size_t, c_size_t, c_void_p, c_int]

cg.CGBitmapContextCreateImage.restype = c_void_p
cg.CGBitmapContextCreateImage.argtypes = [c_void_p]

cg.CGContextSetRGBFillColor.argtypes = [c_void_p, c_double, c_double, c_double, c_double]
cg.CGContextFillRect.argtypes = [c_void_p, CGRect]
cg.CGContextScaleCTM.argtypes = [c_void_p, c_double, c_double]
cg.CGContextDrawPDFPage.argtypes = [c_void_p, c_void_p]
cg.CGContextRelease.argtypes = [c_void_p]
cg.CGImageRelease.argtypes = [c_void_p]
cg.CGColorSpaceRelease.argtypes = [c_void_p]
cg.CGPDFDocumentRelease.argtypes = [c_void_p]

# ImageIO
iio.CGImageDestinationCreateWithURL.restype = c_void_p
iio.CGImageDestinationCreateWithURL.argtypes = [c_void_p, c_void_p, c_size_t, c_void_p]

iio.CGImageDestinationAddImage.argtypes = [c_void_p, c_void_p, c_void_p]
iio.CGImageDestinationFinalize.restype = c_int
iio.CGImageDestinationFinalize.argtypes = [c_void_p]

def render_pdf_page(pdf_path, page_num, out_png_path, dpi_scale=3.0):
    c_pdf_path = pdf_path.encode('utf-8')
    url = cf.CFURLCreateFromFileSystemRepresentation(None, c_pdf_path, len(c_pdf_path), 0)
    doc = cg.CGPDFDocumentCreateWithURL(url)
    cf.CFRelease(url)
    
    if not doc:
        print("Failed to open PDF:", pdf_path)
        return False
        
    num_pages = cg.CGPDFDocumentGetNumberOfPages(doc)
    print(f"{pdf_path}: {num_pages} pages")
    
    page = cg.CGPDFDocumentGetPage(doc, page_num)
    if not page:
        print("Failed to get page", page_num)
        cg.CGPDFDocumentRelease(doc)
        return False
        
    rect = cg.CGPDFPageGetBoxRect(page, 0) # 0 = kCGPDFMediaBox
    w = int(rect.size.width * dpi_scale)
    h = int(rect.size.height * dpi_scale)
    print(f"Rendering page {page_num}: {rect.size.width}x{rect.size.height} -> {w}x{h}")
    
    color_space = cg.CGColorSpaceCreateDeviceRGB()
    # 8 bits per component, 4 bytes per pixel (RGBA = kCGImageAlphaPremultipliedLast = 1)
    bytes_per_row = w * 4
    ctx = cg.CGBitmapContextCreate(None, w, h, 8, bytes_per_row, color_space, 1)
    
    # White background
    cg.CGContextSetRGBFillColor(ctx, 1.0, 1.0, 1.0, 1.0)
    cg.CGContextFillRect(ctx, CGRect(CGPoint(0, 0), CGSize(w, h)))
    
    # Scale and draw PDF
    cg.CGContextScaleCTM(ctx, dpi_scale, dpi_scale)
    cg.CGContextDrawPDFPage(ctx, page)
    
    # Create image
    img = cg.CGBitmapContextCreateImage(ctx)
    
    # Save image using ImageIO
    c_out_path = out_png_path.encode('utf-8')
    out_url = cf.CFURLCreateFromFileSystemRepresentation(None, c_out_path, len(c_out_path), 0)
    png_type = cf.CFStringCreateWithCString(None, b"public.png", 0x08000100) # kCFStringEncodingUTF8
    
    dest = iio.CGImageDestinationCreateWithURL(out_url, png_type, 1, None)
    iio.CGImageDestinationAddImage(dest, img, None)
    success = iio.CGImageDestinationFinalize(dest)
    
    # Cleanup
    cf.CFRelease(dest)
    cf.CFRelease(png_type)
    cf.CFRelease(out_url)
    cg.CGImageRelease(img)
    cg.CGContextRelease(ctx)
    cg.CGColorSpaceRelease(color_space)
    cg.CGPDFDocumentRelease(doc)
    
    print("Saved image to:", out_png_path, "success:", bool(success))
    return bool(success)

if __name__ == "__main__":
    banner_pdf = "/Users/mdeesha/.gemini/antigravity/brain/034cc81c-ed3d-41e4-816c-bea6875e4dbb/.user_uploaded/media_1793786777297_84a97573.pdf"
    # Page 1: Banner with Sonu Sir and students
    render_pdf_page(banner_pdf, 1, "/Users/mdeesha/Desktop/MDI/public/mdi-banner.png", 3.0)
    # Page 2: Real official logo emblem!
    render_pdf_page(banner_pdf, 2, "/Users/mdeesha/Desktop/MDI/public/mdi-real-logo.png", 4.0)
    
    # Also render page 1 of invoice PDF
    invoice_pdf = "/Users/mdeesha/.gemini/antigravity/brain/034cc81c-ed3d-41e4-816c-bea6875e4dbb/.user_uploaded/media_1793788893124_6d7d8aea.pdf"
    render_pdf_page(invoice_pdf, 1, "/Users/mdeesha/Desktop/MDI/public/mdi-invoice-sample.png", 3.0)

