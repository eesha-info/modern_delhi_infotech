import ctypes
from ctypes import c_void_p, c_int, c_double, c_char_p, c_size_t, Structure, POINTER, c_ubyte

cg = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics")
iio = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/ImageIO.framework/ImageIO")
cf = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation")

class CGPoint(Structure):
    _fields_ = [("x", c_double), ("y", c_double)]

class CGSize(Structure):
    _fields_ = [("width", c_double), ("height", c_double)]

class CGRect(Structure):
    _fields_ = [("origin", CGPoint), ("size", CGSize)]

cf.CFURLCreateFromFileSystemRepresentation.restype = c_void_p
cf.CFURLCreateFromFileSystemRepresentation.argtypes = [c_void_p, c_char_p, c_size_t, c_int]
cf.CFStringCreateWithCString.restype = c_void_p
cf.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, c_int]
cf.CFRelease.argtypes = [c_void_p]

iio.CGImageSourceCreateWithURL.restype = c_void_p
iio.CGImageSourceCreateWithURL.argtypes = [c_void_p, c_void_p]
iio.CGImageSourceCreateImageAtIndex.restype = c_void_p
iio.CGImageSourceCreateImageAtIndex.argtypes = [c_void_p, c_size_t, c_void_p]

cg.CGImageGetWidth.restype = c_size_t
cg.CGImageGetWidth.argtypes = [c_void_p]
cg.CGImageGetHeight.restype = c_size_t
cg.CGImageGetHeight.argtypes = [c_void_p]
cg.CGImageCreateWithImageInRect.restype = c_void_p
cg.CGImageCreateWithImageInRect.argtypes = [c_void_p, CGRect]

cg.CGColorSpaceCreateDeviceRGB.restype = c_void_p
cg.CGBitmapContextCreate.restype = c_void_p
cg.CGBitmapContextCreate.argtypes = [c_void_p, c_size_t, c_size_t, c_size_t, c_size_t, c_void_p, c_int]
cg.CGBitmapContextGetData.restype = POINTER(c_ubyte)
cg.CGBitmapContextGetData.argtypes = [c_void_p]
cg.CGContextDrawImage.argtypes = [c_void_p, CGRect, c_void_p]

iio.CGImageDestinationCreateWithURL.restype = c_void_p
iio.CGImageDestinationCreateWithURL.argtypes = [c_void_p, c_void_p, c_size_t, c_void_p]
iio.CGImageDestinationAddImage.argtypes = [c_void_p, c_void_p, c_void_p]
iio.CGImageDestinationFinalize.restype = c_int
iio.CGImageDestinationFinalize.argtypes = [c_void_p]

def crop_whitespace(src_path, dest_path):
    c_src = src_path.encode('utf-8')
    src_url = cf.CFURLCreateFromFileSystemRepresentation(None, c_src, len(c_src), 0)
    source = iio.CGImageSourceCreateWithURL(src_url, None)
    cf.CFRelease(src_url)
    
    img = iio.CGImageSourceCreateImageAtIndex(source, 0, None)
    cf.CFRelease(source)
    
    w = cg.CGImageGetWidth(img)
    h = cg.CGImageGetHeight(img)
    print("Original size:", w, h)
    
    cs = cg.CGColorSpaceCreateDeviceRGB()
    bytes_per_row = w * 4
    ctx = cg.CGBitmapContextCreate(None, w, h, 8, bytes_per_row, cs, 1) # RGBA
    cg.CGContextDrawImage(ctx, CGRect(CGPoint(0, 0), CGSize(w, h)), img)
    
    data = cg.CGBitmapContextGetData(ctx)
    
    min_x, max_x = w, 0
    min_y, max_y = h, 0
    
    # scan for non-white pixels
    # in CGBitmapContext, y=0 is bottom
    for y in range(h):
        row_offset = y * bytes_per_row
        for x in range(w):
            idx = row_offset + x * 4
            r = data[idx]
            g = data[idx+1]
            b = data[idx+2]
            # If not pure white / near white
            if r < 240 or g < 240 or b < 240:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    pad = 20
    crop_x = max(0, min_x - pad)
    crop_y = max(0, min_y - pad)
    crop_w = min(w - crop_x, (max_x - min_x) + pad * 2)
    crop_h = min(h - crop_y, (max_y - min_y) + pad * 2)
    
    print(f"BBox: ({min_x}, {min_y}) to ({max_x}, {max_y}), crop size: {crop_w}x{crop_h}")
    
    cropped_img = cg.CGImageCreateWithImageInRect(img, CGRect(CGPoint(crop_x, crop_y), CGSize(crop_w, crop_h)))
    
    c_dest = dest_path.encode('utf-8')
    dest_url = cf.CFURLCreateFromFileSystemRepresentation(None, c_dest, len(c_dest), 0)
    png_type = cf.CFStringCreateWithCString(None, b"public.png", 0x08000100)
    dest = iio.CGImageDestinationCreateWithURL(dest_url, png_type, 1, None)
    iio.CGImageDestinationAddImage(dest, cropped_img, None)
    res = iio.CGImageDestinationFinalize(dest)
    
    cf.CFRelease(dest)
    cf.CFRelease(png_type)
    cf.CFRelease(dest_url)
    print("Cropped logo saved to:", dest_path)

if __name__ == "__main__":
    crop_whitespace("/Users/mdeesha/Desktop/MDI/public/mdi-real-logo.png", "/Users/mdeesha/Desktop/MDI/public/mdi-real-logo-cropped.png")

